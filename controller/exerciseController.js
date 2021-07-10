import db from '../db.js'

const Show = (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var start = (page - 1) * perPage
    var end = page * perPage

    let sql = "SELECT * FROM exercise_list"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            var pageLength = Math.floor(results.length / perPage) + 1
            res.render('Exercise/showExercise', {
                product: results.slice(start, end),
                page
            })
        }
    })
}

const create = (req, res) => {
    let id = req.query.id
    if (typeof id !== 'undefined') {
        let sql = "Select * from exercise_list where id = " + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    res.render('Exercise/createExercise', {
                        exercise: results[0]
                    })
                } else {
                    res.render('Exercise/createExercise')
                }
            }
        })
    } else {
        res.render('Exercise/createExercise')
    }
}

const postCreate = (req, res) => {

    let id = req.body.id
    if (typeof id !== 'undefined') {
        let exercise = req.body
        let sql = "Select * from exercise_list where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let sqlUpdate = "UPDATE exercise_list SET ? WHERE id=" + id
                    db.query(sqlUpdate, exercise, (error, results) => {
                        if (error) throw error;
                        else {
                            let sql = "SELECT * FROM exercise_list"
                            db.query(sql, (error, results) => {
                                if (error) throw error;
                                else {
                                    res.render('Exercise/showExercise', {
                                        product: results
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    } else {
        req.body.file_demo = req.file.path.split('\\').slice(1).join('\\')
        let exercise = req.body
        let sql = "Select * from exercise_list where exercise_name = ?"
        db.query(sql, exercise.exercise_name, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    res.render('Exercise/createExercise', {
                        error: "sản phẩm đã có"
                    })
                }
                let sqlInsert = "INSERT INTO exercise_list SET ?"
                db.query(sqlInsert, exercise, (error, results) => {
                    if (error) throw error

                    else {
                        res.render('Exercise/createExercise')
                    }
                })
            }
        })
    }


}

const deleteExercise = (req, res) => {
    let id = req.query.id
    let sql = "Select * from exercise_list where id = " + id
    db.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                let sqlDelete = "delete from exercise_list  where id = " + id
                db.query(sqlDelete, (error) => {
                    if (error) throw error;
                    else {
                        let sqlProduct = "Select * from exercise_list "
                        db.query(sqlProduct, (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                res.render('Exercise/showExercise', {
                                    product: results
                                })
                            }
                        })
                    }
                })
            } else {
                let sql = "SELECT * FROM exercise_list "
                db.query(sql, (error, results) => {
                    if (error) throw error;
                    else {
                        res.render('Exercise/showExercise', {
                            product: results,
                            error: "Id không tồn tại"
                        })
                    }
                })
            }
        }
    })

}

const search = (req, res) => {
    let name = req.query.search
    let sql = "Select * from exercise_list where exercise_name like " + `'%${name}%'`
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('Exercise/showExercise', {
                product: results
            })

        }
    })

}

const controllerUser = {
    Show,
    create,
    postCreate,
    deleteExercise,
    search
}

export default controllerUser