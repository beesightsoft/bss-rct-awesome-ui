/*
 * @Author: Nhan Cao 
 * @Date: 2018-01-31 13:18:05 
 * @Last Modified by: nhancv92@gmail.com
 * @Last Modified time: 2018-01-31 15:52:03
 */

const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const print = require('chalk-printer')
const exec = require('child_process').execSync
const format = require('string-format-js')
const version = require('./package.json').version

const prefix = "bee/"
const log = console.log

//TODO: Declare options
program
    .version('0.1.0')
    .option('-n, --new <lib_name>', 'New module', /^[a-zA-Z0-9]{2,50}$/g)
    .action(function () {
        log("new")
    })
    .option('-i, --install <lib_name>', 'Install module', /^[a-zA-Z0-9]{2,50}$/g)
    .action(function () {
        log("install")
    })
    .option('-u, --uninstall <lib_name>', 'Uninstall module', /^[a-zA-Z0-9]{2,50}$/g)
    .action(function () {
        log("uninstall")
    })
    .parse(process.argv)

//TODO: Make help option is default
if (!process.argv.slice(2).length) {
    program.outputHelp(chalk.hex('#ED5323'));
} else {
    try {
        if (program.install) {
            var lib = program.install
            var libDir = './BeeUi/bee-%s'.format(lib)
            if (fs.existsSync(libDir)) {
                exec('npm install "./BeeUi/bee-%s" --save'.format(lib))
                print.ok('Module installed: @%s%s'.format(prefix, lib))
            } else {
                print.warn('Module does not exist')
            }
        } else if (program.uninstall) {
            var lib = program.uninstall
            var packageJson = './package.json'
            if (fs.existsSync(packageJson) && require(packageJson).dependencies['@%s%s'.format(prefix, lib)]) {
                exec('npm uninstall @%s%s  --save'.format(prefix, lib))
            }
            var libDir = './BeeUi/bee-%s'.format(lib)
            if (fs.existsSync(libDir)) {
                fs.readdirSync(libDir).forEach(function (file, index) {
                    var curPath = libDir + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(libDir);
            }
            print.ok('Module uninstalled: @%s%s'.format(prefix, lib))
        } else if (program.new) {
            var lib = program.new
            var templateDir = './BeeUi/.template'
            var libDir = './BeeUi/bee-%s'.format(lib)
            if (!fs.existsSync(libDir)) {
                fs.mkdirSync(libDir)
                fs.readdirSync(templateDir).filter((file) => file !== '.DS_Store').forEach(file => {
                    fs.copyFileSync('%s/%s'.format(templateDir, file), '%s/%s'.format(libDir, file))
                })
                var packageJson = '%s/package.json'.format(libDir)
                if (fs.existsSync(packageJson)) {
                    var file = require(packageJson)
                    file.name = '@%s%s'.format(prefix, lib)
                    fs.writeFileSync(packageJson, JSON.stringify(file));
                }
                print.ok('Module created: @%s%s'.format(prefix, lib))
            } else {
                print.warn('Module exists')
            }
        }
    } catch (error) {
        print.error(error)
    }
}