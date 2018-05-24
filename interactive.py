from create_col import *
from create_file import *
from create_user import *
from get_all_files import *
from get_file import *
from get_location import *
from get_score import *
from get_top_ten import *
from get_user_id import *
from give_points import *
from update_score import *
from next_loc import *

def modify(filename, id):
	return 'files/'+str(id)+'.'+filename

def read(filename):
	with open(filename, 'r') as myfile:
		data = myfile.read()
	return data;

def get_bundle():
	return [(a, b, read(modify(b, d)),c ,d) for a, b, c, d in get_all_files()]

def initialize():
	from subprocess import call
	call(['bash', 'initialize'])

