export class Profile {
  email: string;
  firstname: string;
  lastname: string;
  changePassword: boolean;
  newpassword: string;
  mobile_no: string;
  profileimage: string;
  profileimagethumb: string;
  profile_image: string;
  blank_user_image_thumb: any;
  repeatPassword: any;
  file: File;
  constructor(src: Profile) {
    for (var key in src) {
      this[key] = src[key];
    }
  }
}