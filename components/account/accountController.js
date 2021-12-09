exports.info = (req, res, next) => {
    res.render('info/account',
            {
                title: 'TNKStore',
                pageTitle: "Account information",
            })
}

