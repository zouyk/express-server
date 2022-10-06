module.exports = function () {

    return (req, res, next) => {


        res.customSend = (messge, status = 1, data = null) => {

            if (!data) return res.send({
                status,
                messge: messge instanceof Error ? messge.message : messge
            })
            else return res.send({
                status,
                messge: messge instanceof Error ? messge.message : messge,
                data
            })

        }

        next()
    }



}