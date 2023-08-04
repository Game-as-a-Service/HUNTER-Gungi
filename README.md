# HUNTER X HUNTER 軍儀

# Intro your game
![](https://cdn.discordapp.com/attachments/1055174759186448514/1055174759400345601/0vRfFcw.png)

軍儀棋是全職獵人嵌合蟻篇出現，作者原創的棋。發源地是劇中的東果陀國。

規則類似象棋，而一開始放棋可以在自己陣地（最接近自己的三行）任意放。

棋盤為9×9的格仔棋盤。

並有特別的疊棋規則，最多疊三層。

所以盤面從平面向上延伸成立體，劇中也是因為軍儀棋這種變化莫測的特性，才讓「王」破解遊戲的同時探索自己的內心！

實作上會以官方版的規則為主如下  
[影片連結](https://www.youtube.com/watch?v=PapqlNp8K5U)

# Practice Stack
- Event Storming 
- BDD (Example Mapping）
- ATDD
- OOAD
- docker
- CI/CD Pipeline
- Clean Architecture

對於目前的pratice stack都不是很熟，但就是列在pratice stack了，一起加油吧

## Tech Stack
- 語言:
   + typescript
- 後端框架:
   + nest.js (https://nestjs.com/)
- 前端框架: 
   + Vue 3 / vue.js (https://vuejs.org/)
   + tailwind CSS
- 開發流程:
   + github flow
- 其他: 
   + docker
- 資料庫:
   + TBD

# Ubiquitous Language
| chinese         | english        |
|-------------|-------------|
| 軍儀盤     | gungiHan    |
| 軍儀       | gungi       |
| 放置區     | gungiOki    |
| 死亡區     | deadArea    |
| 擲駒       | furiGoma    |
| 棋         | goma        |
| 移駒       | ugokiGoma   |
| 新         | arata       |
| 推疊       | tsukeru     |
| 投降       | surrender   |
## category of goma
| chinese  | english |
|-------|-------------|
| 帥     | osho       |
| 兵     | hei         |
| 小     | sho         |
| 中     | chu         |
| 大     | dai         |
| 馬     | uma         |
| 侍     | shi         |
| 槍     | yari        |
| 砲     | ho          |
| 弓     | yumi        |
| 筒     | tsutsu      |
| 砦     | toride      |
| 謀     | hakaru      |
| 忍     | shinobi     |

# Development Environment Setup

The development environment is streamlined across operating systems using Docker container and image.

## Step 1: Set up git environment
* Local machine git config
   * name
   * email
Example:
```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
The email should be one of the emails on the profile settings page on GitHub.

Link: https://github.com/settings/emails

At this stage it's recommended to use SSH on GitHub but it's not required.

* Generating SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
* Adding new SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

## Step 2: Install Required Technologies
* Docker
   * https://www.docker.com/products/docker-desktop/
   * Running Docker on Windows 10 or 11 requires `Hyper-V` enabled

* NodeJs
   * Link: `https://nodejs.org/en/`
   * `nvm` is recommended to manage NodeJs versions but not required
      * Install link: https://github.com/nvm-sh/nvm#installing-and-updating
      * Once `nvm` is installed run the following commands:
      ```bash
      $ nvm install 18
      $ nvm alias default 18  # this sets the default alias to 18
      $ nvm use default  # explicitly uses default
      $ nvm list # lists all the installed and available node versions
      ```

## Step 3: Set up project library CLI
* NestJS
   * Run `npm install -g @nestjs/cli`
   * NestJS CLI doc: https://docs.nestjs.com/cli/overview
   * This CLI will help with code generation using various code

## Step 4: Configure Local Environment

### Cloning the repo
* SSH
```bash
$ git clone git@github.com:Game-as-a-Service/HUNTER-Gungi.git
```
* HTTP
```bash
git clone https://github.com/Game-as-a-Service/HUNTER-Gungi.git
```

### Local Dev Environment Setup

* Install all dependencies from package.json in both `server` and `frontend`

```
$ cd ./server ; npm install
$ cd ./frontend ; npm install
```

## Step 5: Build and Run Project

### Building project

On the root folder directory run:
```bash
$ npm run start
```
This will build the image if there is no required image found and start running both the server and frontend.

* local server:   [localhost:8000](localhost:8000)
* local frontend: [localhost:3000](localhost:3000)


## Additional Notes
* It's possible to run the application without Docker and this will just start a normal instance of server and frontend without Docker. Commands:
   * on server: `npm run start:dev`
   * on frontend: `npm run dev`
* The Docker container is set up with hot reload on both server and frontend
