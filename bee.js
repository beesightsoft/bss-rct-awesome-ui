/*
 * @Author: Nhan Cao 
 * @Date: 2018-01-31 13:18:05 
 * @Last Modified by: nhancv92@gmail.com
 * @Last Modified time: 2018-02-26 14:47:10
 */
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const print = require('chalk-printer')
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const version = require('./package.json').version

const prefix = '@beesight/'
const log = console.log

//TODO: Declare options
program
  .version(version)
  .option('-n, --new <lib_name>', 'New module')
  .option('-i, --install <lib_name>', 'Install module')
  .option('-u, --uninstall <lib_name>', 'Uninstall module')
  .option('-p, --publish <lib_name>', 'Publish module')
  .parse(process.argv)

//TODO: Make help option is default
if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.hex('#ED5323'))
} else {
  try {
    if (program.install) {
      var lib = program.install
      var libDir = `./BeeUi/bee-${lib}`
      if (fs.existsSync(libDir)) {
        exec(`npm install "./BeeUi/bee-${lib}" --save`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
          print.ok(`Module installed: ${prefix}${lib}`)
        })
      } else {
        print.warn('Module does not exist')
      }
    } else if (program.uninstall) {
      var lib = program.uninstall
      var packageJson = './package.json'
      if (fs.existsSync(packageJson) && require(packageJson).dependencies[`${prefix}${lib}`]) {
        execSync(`npm uninstall ${prefix}${lib} --save`)
      }
      var libDir = `./BeeUi/bee-${lib}`
      if (fs.existsSync(libDir)) {
        fs.readdirSync(libDir).forEach(function (file, index) {
          var curPath = `${libDir}/${file}`
          fs.unlinkSync(curPath)
        })
        fs.rmdirSync(libDir)
      }
      print.ok(`Module uninstalled: ${prefix}${lib}`)
    } else if (program.publish) {
      var lib = program.publish
      var libDir = `./BeeUi/bee-${lib}`
      if (fs.existsSync(libDir)) {
        exec(`cd ${libDir} && npm publish --access=public`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
          print.ok(`Done: ${prefix}${lib}`)
        })
      } else {
        print.warn('Module does not exist')
      }
    } else if (program.new) {
      var lib = program.new
      var templateDir = './BeeUi/.template'
      var libDir = `./BeeUi/bee-${lib}`
      if (!fs.existsSync(libDir)) {
        fs.mkdirSync(libDir)
        fs.readdirSync(templateDir).filter((file) => file !== '.DS_Store').forEach(file => {
          fs.copyFileSync(`${templateDir}/${file}`, `${libDir}/${file}`)
        })
        var packageJson = `${libDir}/package.json`
        if (fs.existsSync(packageJson)) {
          var file = require(packageJson)
          file.name = `${prefix}${lib}`
          fs.writeFileSync(packageJson, JSON.stringify(file, null, 2), 'utf-8')
        }
        print.ok(`Module created: ${prefix}${lib}`)
      } else {
        print.warn('Module exists')
      }
    }
  } catch (error) {
    print.error(error)
  }
}