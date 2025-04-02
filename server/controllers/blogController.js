import blogModel from "../models/blogModel.js";

class BlogController{
    static getAllBlogs= async(req,res)=>{
        try{
            const fetchAllBlogs= await blogModel.find({user: req.user._id});
            return res.status(200).json(fetchAllBlogs);
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    };
    static addNewBlog = async (req, res) => {
        const { title, category, description } = req.body;
    
        try {
            // Ensure all required fields are present
            if (title && category && description) {
                // Retrieve the file if it exists
                const thumbnail = req.file ? req.file.path : null; // Or req.file.filename based on your Multer config
    
                if (!thumbnail) {
                    return res.status(400).json({ message: "Thumbnail is required" });
                }
    
                // Create a new blog document
                const addBlog = new blogModel({
                    title: title,
                    description: description,
                    category: category,
                    thumbnail: thumbnail,
                    user: req.user._id, // Assuming user information is being populated in req.user
                });
    
                // Save the blog to the database
                const savedBlog = await addBlog.save();
                if (savedBlog) {
                    return res.status(200).json({ message: "Blog added successfully" });
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    
    static getSingleBlog= async(req,res)=>{
        const{id}=req.params;
        try{
            if(id){
                const fetchBlogsByID=await blogModel.findById(id);
                return res.status(200).json(fetchBlogsByID);
            }else{
                return res.status(400).json({message: "Invalid Url"});
            }
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    };
}
export default BlogController;