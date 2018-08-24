## Docker Hearts Security
> This game is the product of a hackathon just shy of 24 hours. It's a game for engineers to test their cyber security skills, gain reputation, and show excellence to companies hiring for security.
[Read more about our project here.](https://medium.com/@MelissaNg__/docker-hearts-security-dd4eee76f09a)

## The gist
Players will be able to code files with scripts either with malware or not. In this current game version, malware is defined as any script that will change the contents of another player’s essential “Heart” file. Players drop their scripts for other players to find. Players will go around reading scripts dropped, make sure there’s no malware that will harm their Heart file, run it, and gain points. If a player runs a script thinking it’s safe but there was malware detected, all their points will be transferred to the creator of this file and they start over from 0 points. Everyone’s points are stored on a score board in the browser, for everyone and potential employers to view. There’s incentive for players to create both malicious and benevolent files because they gain points both ways. Regarding points, there’s two situations: a player gets ten points for running a script without malware while the script creator gets two points for everyone who runs their script or, a player loses all their points for running a script with malware and the script’s creator gains all of that player’s points.

## Why play?
* Playing this game will boost your skills for detecting malware, introducing you to other engineers’ techniques when writing sneaky code.
* It will also help you gain an understanding of how much you know about security.
* Best of all, companies might reach out to you if you gain a lot of reputation with your points.
* All this dangerous activity is practiced in a safe environment since accidentally running a malicious script only affects your Docker container. If it’s destroyed, we’ll give you another Docker container!

## Usage:
> This project is constantly being updated, with new versions. Here are snippets of the code. Docker images/containers specific to this game are availalble at [DockerHub.](https://hub.docker.com/r/melissan/security_game/) 

![Opps! You missed a screenshot of our game](https://raw.githubusercontent.com/MelissaN/DockerHeartsSecurity/master/V2/screenshots/kouki700.JPG)

---
### Authors
* Madison Burke [![M](https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/30px-Twitter_Bird.svg.png)](https://twitter.com/JsonBurke) || [Github](https://github.com/RocketHTML)
* Miranda Evans [![M](https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/30px-Twitter_Bird.svg.png)](https://twitter.com/mirandarevans) || [Github](https://github.com/RocketHTML)
* Melissa Ng [![M](https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/30px-Twitter_Bird.svg.png)](https://twitter.com/MelissaNg__) || [Github](https://github.com/MelissaN)