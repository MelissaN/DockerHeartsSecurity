import re
import json
import hashlib
from merkletools import MerkleTools


class Chainpoint(object):
    CHAINPOINT_VERSIONS = ['1.0', '1.1', '2']
    CHAINPOINT_V2_ANCHORTYPES = ['BTCOpReturn']

    def valid_receipt(self, receipt_json):
        receipt = json.loads(receipt_json)
        receipt_version = None
        if 'header' in receipt:
            # header section was found, so this could be a pre-v2 receipt
            receipt_version = receipt[u'header']['chainpoint_version']
        else:
            # no header was found, so it is not a v1.x receipt, check for v2
            if 'type' in receipt:
                receipt_type = receipt['type']
            elif '@type' in receipt:
                receipt_type = receipt['@type']
            else:
                raise AssertionError("Cannot identify Chainpoint version")
            valid_type = re.match('^Chainpoint.*v2$', receipt_type)  # validate 'type' attribute value
            if valid_type:
                receipt_version = '2'
            if not receipt_version:
                raise AssertionError("Invalid Chainpoint type: %s" % receipt_type)

        if not receipt_version:
            raise ValueError("Cannot identify Chainpoint version")
        try:
            if receipt_version == '1.0' or receipt_version == '1.1':
                return self._validate_receipt_v1x(receipt['header'], receipt['target'])
            elif receipt_version == '2':
                return self._validate_receipt_v2x(receipt['proof'], receipt['targetHash'], receipt['merkleRoot'], receipt_type)
            else:
                raise ValueError('Invalid Chainpoint version: %s' % receipt_version)
        except KeyError as e:
            raise AssertionError('Missing %s' % e.args[0])

    def _validate_receipt_v1x(self, receipt_header, target):
        hash_type = receipt_header['hash_type']
        if hash_type != 'SHA-256':
            raise AssertionError('Invalid hash type: %s' % hash_type)

        self._assertHex(receipt_header['tx_id'], 64)
        tx_id = receipt_header['tx_id']
        timestamp = receipt_header['timestamp']
        if not isinstance(timestamp, (int, long)):
            raise AssertionError("Invalid timestamp: %s" % timestamp)

        self._assertHex(target['target_hash'], 64)
        if not isinstance(target['target_proof'], list):
            raise AssertionError("Invalid target_proof: %s" % target['target_proof'])

        last_parent = target['target_hash']

        for proof in target['target_proof']:
            self._assertHex(proof['left'], 64)
            self._assertHex(proof['right'], 64)
            self._assertHex(proof['parent'], 64)
            node_hash = hashlib.sha256(proof['left'] + proof['right']).hexdigest()
            if proof['parent'] != node_hash:
                raise AssertionError("Invalid proof path")

            # check for presence of last parent
            if proof['left'] != last_parent and proof['right'] != last_parent:
                raise AssertionError("Invalid proof path")
            else:
                last_parent = proof['parent']
        return receipt_header['merkle_root'] == last_parent


    def _validate_receipt_v2x(self, proof, target_hash, merkle_root, receipt_type):
        hash_type_re = re.match('^Chainpoint(.*)v2$', receipt_type)
        if not hash_type_re:
            raise AssertionError("Invalid Chainpoint type: %s" % receipt_type)

        hash_type = hash_type_re.groups()[0]
        valid_hashes=['SHA224', 'SHA256', 'SHA384', 'SHA512', 'SHA3-224', 'SHA3-256', 'SHA3-384', 'SHA3-512']

        if hash_type not in valid_hashes:
            raise AssertionError("Invalid Chainpoint type: %s" % receipt_type)

        hash_type_bits = hash_type[-3:]
        hash_len = (int(hash_type_bits) / 4)

        self._assertHex(target_hash, hash_len)
        self._assertHex(merkle_root, hash_len)

        if not isinstance(proof, list):
            raise AssertionError("Missing proof")
        if not proof:
            # no siblings, single item tree, so the hash should also be the root
            return target_hash == merkle_root
        for p in proof:
            if 'left' in p:
                proof_item_value = p['left']
            elif 'right' in p:
                proof_item_value = p['right']
            else:
                raise AssertionError("Invalid proof path")

            self._assertHex(proof_item_value, hash_len)
        merkle_tools = MerkleTools(hash_type=hash_type)
        return merkle_tools.validate_proof(proof, target_hash, merkle_root)


    @staticmethod
    def _assertHex(val, hash_len):
        try:
            int(val, 16)
            return len(val) == hash_len
        except ValueError:
            raise AssertionError("Invalid hash value: %s" % val)
