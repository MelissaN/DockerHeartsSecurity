#!/usr/bin/python3
from sys import argv

def read(filename):
        with open(filename, 'r') as myfile:
                data = myfile.read()
        return data;

if len(argv) != 1:
	print(1)
	exit(1)

from subprocess import call

heart = read('/Heart.txt')
call(["bash", 'test')
heart2 = read('/Heart.txt')
if (heart != heart2):
	print(3)
	exit(3)
else:
	print(0)
	exit(0)
