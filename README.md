# Home Dashboard

[![Release](https://github.com/camandel/home-dashboard/actions/workflows/release.yml/badge.svg)](https://github.com/camandel/home-dashboard/actions/workflows/release.yml)

**Home Dashboard** is a simple startpage to keep track of your favourite servers, applications, links and personal tasks. It can be used as your default browser starting page. 
This project is based on [SUI](https://github.com/jeroenpardon/sui).

<p align="center">
  <img src="assets/screenshot.jpg?raw=true" alt="screenshot"/>
</p>

## Try it
Live demo [here](https://camandel.github.io/home-dashboard/)

## Features
- single page application
- TODO tasks list
- tasks can be added (just press `ENTER` or click the button), marked/unmarked as done, modified (click on the text and to modify it) and deleted
- date and time on the top-right corner
- apps and links configuration on separate `json` files
- responsive design for mobile

**NOTE**: tasks data are written into the browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) not on the web server, so tasks can not be shared among different browsers

## Installation
You can download the sources and serve them with a web server:
- cloning the repository:
```
git clone https://github.com/camandel/home-dashboard.git
```
- or downloading the zip or tar.gz archives from GitHub:
```
wget https://github.com/camandel/home-dashboard/archive/refs/tags/<version>.zip
unzip home-dashboard-<version>.zip
```
- then copy the directory into the document root of your web server:
```
mv home-dashboard /var/www/html && systemctl start httpd
```
-  or use python, or any other tool, just to test it directly from the current directory:
```
cd home-dashboard && python -m http.server
```
If you don't want to setup a web server you can use directly the tiny docker image (only 31 KB) which contains the code and an http server listening on port 8000:
```
docker run --name home-dashboard -v <your-volume-or-local-dir>:/www/conf -p 8000:8000 -d camandel/home-dashboard
```

## Configuration
To modify the configuration you have just to enter the `conf` directory and edit these two files: `apps.json` and `links.json`.

`apps.json` file contains configurations for you home servers or applications:
- `name`: application name
- `url`: application url and description
- `descr` (optional): used to overwrite the URL displayed below the `name`. Default is `url`
- `proto` (optional): used to specify a protocol (ex. `http`, `ftp`, etc.). Default is `https`
- `icon`: icon name (without `mdi-` prefix). Icons from [Material Design Icon set](https://icon-sets.iconify.design/mdi/) from [Iconify](https://iconify.design))

Example:
```json
{
    "apps": [
        {
            "name": "My App",
            "url": "myapp.example.com/app/site",
            "descr": "my app description",
            "proto": "http",
            "icon": "server"
        }
    ]
}
```
`links.json` file contains your favorite links grouped by custom categories:
- `category`: category name
- `links'`: list of links into the same category
- `name`: link name
- `url`: site URL

Example:
```json
{
  "bookmarks": [
    {
      "category": "My Category",
      "links": [
        {
          "name": "My Link",
          "url": "https://myfavoritesite.example.com/forum/user"
        }
      ]
    }
  ]
}
```
## Thanks to
- [Jeroen](https://github.com/jeroenpardon) for the awesome [SUI](https://github.com/jeroenpardon/sui)
- [vladimirschneider](https://dev.to/vladimirschneider) for his article on how to write a [Simple To-Do list using localstorage](https://dev.to/vladimirschneider/simple-to-do-list-using-localstorage-29on)
- [Iconify](https://iconify.design/) for its framework
- [nemasu](https://github.com/nemasu) for its fantastic [asmttpd](https://github.com/nemasu/asmttpd) a tint (6 KB) web server written in assembler
- [Taco de Wolff](https://github.com/tdewolff) for [minify](https://github.com/tdewolff/minify)