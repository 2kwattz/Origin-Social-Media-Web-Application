function Test(){

    let myName = "Roshan"
    let number = 45;
    let fullName = () => {
        return 'Roshan Bhatia'
    }

    return 
    <React.Fragment>
    <p> 
    Test message : {number} , I am {fullName()}
    </p>

    </React.Fragment>

}

export default Test;