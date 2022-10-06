module.exports = function (option = {}) {

    const keys = Object.keys(option)

    return (req, res, next) => {

        keys.forEach(key => {
            const result = option[key].validate(req[key] || {})
            if (result?.error) {
                throw result.error
            }
        })

        next()



    }



}