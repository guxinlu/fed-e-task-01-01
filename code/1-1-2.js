function checkAge(min){
    return function(age){
        return age >= min
    }
}

const checkAge18 = checkAge(18)