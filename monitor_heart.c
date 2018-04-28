#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>

#define MODIFICATION 3

int main(int ac, char **av)
{
	pid_t pid;
	struct stat before;
	struct stat after;
	char **script;
	extern char **environ;
	int status;

	if (ac != 3)
		exit(EXIT_FAILURE);

	if (stat(av[1], &before) < 0)
		exit(EXIT_FAILURE);

	script = malloc(sizeof(char *) * 2);
	script[0] = av[2];
	script[1] = NULL;

	pid = fork();
	if (pid == -1)
		exit(EXIT_FAILURE);
	if (pid == 0)
	{
		execve(av[2], script, environ);
		exit(EXIT_FAILURE);
	}

	wait(&status);
	free(script);

	if (stat(av[1], &after) != 0)
		return (MODIFICATION);

	if (before.st_atime != after.st_atime ||
	    before.st_mtime != after.st_mtime ||
	    before.st_ctime != after.st_ctime)
		return (MODIFICATION);

	return (0);
}
