#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <fcntl.h>

#define MODIFICATION 3

int main(int ac, char **av)
{
	pid_t pid;
	struct stat before;
	struct stat after;
	char **script;
	extern char **environ;
	int status;
	int bytes_read;
	int fd;
	char buffer1[10];
	char buffer2[10];

	if (ac != 3)
		exit(EXIT_FAILURE);

	fd = open(av[1], O_RDONLY);
	if (fd == -1)
		exit(EXIT_FAILURE);

	bytes_read = read(fd, buffer1, 9);
	if (bytes_read < 0)
		exit(EXIT_FAILURE);
	buffer1[0] = '\0';

	close(fd);

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

	fd = open(av[1], O_RDONLY);
	if (fd == -1)
		return (MODIFICATION);

	bytes_read = read(fd, buffer2, 9);
	if (bytes_read < 0)
		exit(EXIT_FAILURE);
	buffer2[9] = '\0';

	close(fd);

	if (strcmp(buffer1, buffer2) != 0)
		return (MODIFICATION);

	return (0);
}
