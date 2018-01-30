const print = require('chalk-printer')
const exec = require('child_process').exec

const prefix = "bee/"

var argv = process.argv.slice(2)
var regex = new RegExp(/^[a-zA-Z0-9]{2,50}$/g)

/*
Example: node bee hello
*/
if (argv.length > 0 && regex.test(argv[0])) {
    var lib = argv[0]
    print.log("Install module: @" + prefix + lib)

    exec('npm install "./BeeUi/bee-' + lib + '"', function callback(error, stdout, stderr) {
        if (error) {
            print.error(stderr)
        } else {
            print.ok(stdout) 
        }
    })

} else {
    print.error("Module is not valid. Must be include [a-z, A-Z, 0-9] and length [2, 50]")
}