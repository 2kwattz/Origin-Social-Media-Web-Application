function Test(){

    let myName = "Roshan"
    let number = 45;
    let fullName = () => {
        return 'Roshan Bhatia'
    }

    return <p> 
    Test message : {number} , I am {fullName()}
    </p>

}

export default Test;