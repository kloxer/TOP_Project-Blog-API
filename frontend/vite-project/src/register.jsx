import './App.css'


function Register(){

    function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/users', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({username, password}),
            });
        
        const data = await response.json();
        


        }
        catch{

        }
    return<>

    <h1>Register today!</h1>

    <form onSubmit={handleSubmit}>

        <label htmlFor="">Username:
        <input type="text" /></label>

        <label htmlFor="">Email:
        <input type="email" /></label>

        <label htmlFor="">Password:
        <input type="password" /></label>

        <button>Submit</button>

    </form>
    
    </>
}


export default Register