import { 
  FaAngleLeft, 
  FaAngleRight,
  FaRegEye,
  FaRegEyeSlash,
  FaArrowUp,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaRegStar,
  FaRegHeart,
  FaMinus,
  FaPlus,
  FaPenAlt
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { FaRegTrashCan, FaHeart } from "react-icons/fa6";

interface Props {
  size:number,
  color:string,
  style?:string
}

export const PenIcon = ({size, color, style}:Props) => {
  return (
    <FaPenAlt size={size} color={color} className={style} />
  )
}

export const TrashIcon = ({size, color, style}:Props) => {
  return (
    <FaRegTrashCan size={size} color={color} className={style} />
  )
}

export const MinusIcon = ({size, color, style}:Props) => {
  return (
    <FaMinus size={size} color={color} className={style} />
  )
}

export const PlusIcon = ({size, color, style}:Props) => {
  return (
    <FaPlus size={size} color={color} className={style} />
  )
}

export const FullHeartIcon = ({size, color, style}:Props) => {
  return (
    <FaHeart size={size} color={color} className={style} />
  )
}

export const HeartIcon = ({size, color, style}:Props) => {
  return (
    <FaRegHeart size={size} color={color} className={style} />
  )
}

export const StarIcon = ({size, color, style}:Props) => {
  return (
    <FaRegStar size={size} color={color} className={style} />
  )
}

export const PinterestIcon = ({size, color, style}:Props) => {
  return (
    <FaPinterest size={size} color={color} className={style} />
  )
}

export const InstagramIcon = ({size, color, style}:Props) => {
  return (
    <FaInstagram size={size} color={color} className={style} />
  )
}

export const TwitterIcon = ({size, color, style}:Props) => {
  return (
    <FaTwitter size={size} color={color} className={style} />
  )
}

export const FacebookIcon = ({size, color, style}:Props) => {
  return (
    <FaFacebook size={size} color={color} className={style} />
  )
}

export const AvatarIcon = ({size, color, style}: Props) => {
  return <GoPersonFill size={size} color={color} className={style} />
}

export const ArrowUpIcon = ({size, color, style}: Props) => {
  return <FaArrowUp size={size} color={color} className={style} />
}

export const CancelIcon = ({size, color, style}: Props) => {
  return <MdCancelPresentation size={size} color={color} className={style} />
}

export const MenuIcon = ({size, color, style}: Props) => {
  return <AiOutlineMenuFold size={size} color={color} className={style} />
}

export const SearchIcon = ({size, color, style}: Props) => {
  return <HiMagnifyingGlass size={size} color={color} className={style} />
}

export const GoogleIcon = ({size, color, style}: Props) => {
  return <FcGoogle size={size} color={color} className={style} />
}

export const EyeSlashIcon = ({size, color, style}: Props) => {
  return <FaRegEyeSlash size={size} color={color} className={style} />
}

export const EyeIcon = ({size, color, style}: Props) => {
  return <FaRegEye size={size} color={color} className={style} />
}

export const LeftAngleIcon = ({size, color, style}: Props) => {
  return <FaAngleLeft size={size} color={color} className={style} />
}

export const RightAngleIcon = ({size, color, style}: Props) => {
  return <FaAngleRight size={size} color={color} className={style} />
}

export const CartIcon = ({size, color, style}: Props) => {
  return <IoCartOutline size={size} color={color} className={style} />
}