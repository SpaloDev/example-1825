
const conf = require('./config.json')

const spalo = require('./spalo')

// check SPALO botId
const botId  = process.argv[2]

if(!botId) return console.log("Error: botId not found")

// SPALO Target API
const spaloApiBasePath = "https://developers-maker.spalo.jp/api/v2"

const spaloLoginPath = spaloApiBasePath + '/user/login'
const spaloApiPath = spaloApiBasePath + '/history/list/' + botId


getList()


async function getList() {

  try {

    const token = await spalo.getToken(spaloLoginPath, conf.spaloAccount)
    const res = await spalo.getData(spaloApiPath, token)

    // HTML作成
    let html = `
<html>
<head>
<meta charset="utf-8">
<title>履歴一覧</title>
</head>
<body>
`

    html += `<h1>${res.botName}</h1>`
    html += `<p>合計${res.total}件 ${res.currentPage}/${res.lastPage}ページ</p>`
    
    // テーブル作成
    html += "<table>"

    for (let i = 0; i < res.data.length; i++) {

      // タイトル
      if(i === 0) {

        html += "<tr><th>送信日時</th><th>送信者</th>"

        for (let j = 0; j < res.titles.length; j++) {
          html += "<th>" + res.titles[j].name + "</th>"
        }

        html += "</tr>"

      }
      
      // データ
      html += "<tr>"

      html += `<td>${res.data[i].createdAt}</td>`
      html += `<td>${res.data[i].userName}</td>`
      
      let contents = res.data[i].contents

      for (let j = 0; j < contents.length; j++) {

        // 画像の場合
        if (contents[j].isImage === true) {

          html += `<td><img src="` + contents[j].value + `"></td>`

        } else {

          html += `<td>` + contents[j].value + `</td>`

        }

      }

      html += "</tr>"

    }
    
    html += "</table></body></html>"
    
    console.log(html)

  } catch (err) {

    console.log(err)

  }

  //console.log('FIN')

}

