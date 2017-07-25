## HomePage

[elemefe.github.io/keynote](https://elemefe.github.io/keynote)

## document syntax

> you can see guide from [reveal-js](http://lab.hakim.se/reveal-js/)
>
> but only support markdown syntax so far.
>
> default separator `----`

# insert new item

> clone this repository to your local

```
git clone git@github.com:ElemeFE/keynote.git
vi keynote/markdown/xxx.md
```

> append your information in menu.json

```
vi keynote/menu.json
```

> example

```
{
  "list": [
    {
      "author": "your name",
      "homepage": "your github homepage",
      "path": "fullname of your document",
      "title": "document name",
      "type": "md",
      "weibo": "your weibo homepage"
    }
  ]
}
```
> valid types include "md" , "html". default type is "md".
>
> then put your file into the corresponding folder.

> create new pull request to that branch named "master" and @ [Xavier](https://github.com/Yuanbin-xavier)
>
> if your pr is merged then you can access your document online.