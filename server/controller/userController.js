import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const { name, email ,address} = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new User({ name, email,address });
    const savedData = await newUser.save();

    // Send response
    // res.status(200).json(savedData);
        res.status(200).json({message:"User created successfully."});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers=async(req,res)=>{
  try {
    const userData=await User.find();
    if(!userData || userData.length===0){
      return res.status(404).json({message:"User Data Not Found."});
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// export const getAllUsers = async (req, res) => {
//   try {
//     const userData = await User.find();
//     res.status(200).json(userData); // ✅ Always return array, even if empty
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };




export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User Data Not Found." });
    }

    res.status(200).json(userExist);  //  MUST return the user
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



export const update=async(req,res)=>{
try {
    const id=req.params.id;
    const userExist=await User.findById(id);
    if(!userExist){
            return res.status(404).json({message:"User Data Not Found."});
    }
   const updatedData= await User.findByIdAndUpdate(id,req.body,{
      new:true
    })
    // res.status(200).json(updatedData)
    res.status(200).json({message:"User updated successfully."});
  } catch (error) {
        res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser=async(req,res)=>{
try {
  const id =req.params.id;
  const userExist=await User.findById(id);
    if(!userExist){
            return res.status(404).json({message:"User Data Not Found."});
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({message:"User deleted successfully."})
} catch (error) {
  res.status(500).json({errorMessage:error.message});
  
}
};
