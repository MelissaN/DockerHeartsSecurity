#!/usr/bin/python3
""" Admin console for Docker Hearts Security containers """
import cmd
import shlex

class DHCommand(cmd.Cmd):
    """Command Line interface for HBNB."""
    prompt = '(docker hearts) '

    def do_create(self, arg):
    	"""Create one container."""
    	return False

    def do_read(self, arg):
    	"""Describe one container."""
    	return False

    def do_all(self, arg):
    	"""Describe all containers."""
    	return False

    def do_update(self, arg):
    	"""Modify one container."""
    	return False

    def do_destroy(self, arg):
    	"""Remove one container."""
    	return False

    def do_save(self, arg):
    	"""Save container to online repo as image."""
    	return False

    def do_revive(self, arg):
    	"""Fetch image from online repo and build container."""
    	return False

    def do_delete(self, arg):
    	"""Delete image from online repo."""
    	return False

    def do_quit(self, arg):
    	"""Quit DockerHeartsContainerConsole"""
    	return True

    def do_EOF(self, arg):
    	"""Represents end of file"""
    	return True

if __name__ == '__main__':
	DHCommand().cmdloop()