function CreateBlogPage(){

    function getBlogInfo(e){
        e.preventDefault();

        alert("preented")
    }
    return (
    <>
        <div className="blog">
            <h2>Blog Page</h2>
                
                <form onSubmit={getBlogInfo}>
                    
                    <label htmlFor="blogTitle">Title
                                <input type="text" name="title"/>
                    </label>
                    <label htmlFor="Content">Content
                                <textarea name="blogContent" id="1"></textarea>
                    </label>
                    <label htmlFor="draft">Draft ?  <input type="checkbox" name="checkbox" />
                </label>
                    <button>Submit</button>
                </form>
        </div>
    </>)
}

export default CreateBlogPage;