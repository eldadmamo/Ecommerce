const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=> console.log('Database Is Connected'))
.catch((err) => console.log(err));


const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    isMarried: Boolean,
    salary: Number,
    gender: String
})

const User = mongoose.model("User", userSchema);

async function fetchInformation(){
    const user = await User.findByIdAndUpdate
    ('',
    { age: 45, isMarried: false},
    { new: true, runValidators: true}
    );
    user.isMarried = true;
    await user.save();
}

fetchInformation();