import docker
import os

def run(cmd):
	with open('dockerland/heart', 'w') as f:
		pass
	client = docker.from_env()
	img = 'alpine'
	mem = '100m'
	remove = True
	volumes = {'/home/DockerHeartsSkeleton/dockerland':
			{'bind': '/dockerland', 'mode': 'rw'}}
	work = '/dockerland'
	kwargs = {'mem_limit': mem, 'remove': remove, 'volumes': volumes,
		  'working_dir': work}
	try:
		output = client.containers.run(img, cmd, **kwargs)
	except(docker.errors.APIError):
		output = ''
	except(docker.errors.ContainerError):
		output = 'container error'
	heartexists = os.path.isfile('dockerland/heart')
	return {'output': output, 'heartexists': heartexists}
