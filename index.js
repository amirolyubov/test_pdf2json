const pdftojson = require('pdftojson')
const fs = require('fs')

const parseRow = (text, key, cb) => cb(key === 0
                                    ? `\n\n============${text}==============\n\n`
                                    : text)

const write2file = data => fs.writeFile('./test.txt', data, err => err && console.log(err))

const runConvertaion = (input, output) => pdftojson(input)
                                          .then(data => parseData(data),
                                                err => convert_failure(err))

const parseData = data => {
  let text = ''
  data.map(page => page.words.map((word, key) => parseRow(word.text, key, row => text += row)))
  write2file(text)
}

const convert_failure = err => console.error(err)

runConvertaion('./test.pdf')
