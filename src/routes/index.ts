import { Router, Request, Response } from "express";
import { modelNames } from "mongoose";
import userModel from '../models/user'

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("routes/home");
});

router.get("/signup", (req: Request, res: Response) => {
  res.render("routes/signup");
});

router.post('/signup', async (req: Request, res: Response) => {
  const user = new userModel(req.body)
  const userReg = await user.save()
  res.redirect(`/publics/user/${userReg._id}`) 
});

router.get("/signin", (req: Request, res: Response) => {
  res.render("routes/signin");
});   

router.post('/signin', async (req: Request, res: Response) => {
  console.log(req.body)
  const {email, password} = req.body
  const query = await userModel.findOne({email})
  if (password == query.password) {
    res.redirect(`/publics/user/${query._id}`)
  } else{
    req.flash('error', 'the data entered is invalid')
    res.redirect(req.path)
  } 
});

router.get('/publics/user/:_id', async (req: Request, res: Response) => {
  const {_id} = req.params;
  const user = await userModel.findById(_id).exec()

  res.render('routes/userView', user )
})

router.get('/publics/user/:_id/edit', async (req: Request, res: Response) => {
  const {_id} = req.params
  const userFind = await userModel.findById(_id).exec()
  res.render('routes/edit', userFind)
});

router.post('/publics/user/:_id/edit', async (req: Request, res: Response) => {
  const {_id} = req.params
  console.log(req.file)
  // Extraed information from body
  const {username, email, password, description, linkFb, linkWsp, linkGit} = req.body
  const dataUpdate = {
    username,
    email,
    password,
    description,
    socialLinks: {
      linkFb,
      linkWsp,
      linkGit,
    }
  }
  // edit avatar
  const newAvatar = req.file?.originalname
  if (newAvatar) {
    await userModel.findOneAndUpdate({_id}, {avatar: `/uploads/${newAvatar}`})
  }
  // edit information
  await userModel.findByIdAndUpdate({_id}, dataUpdate)
  res.redirect(`/publics/user/${_id}`)
})
 
export default router; 