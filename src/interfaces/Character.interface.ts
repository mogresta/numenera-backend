import { CharacterType } from "../entities/CharacterType.entity";
import { User } from "../entities/User.entity";

export default interface CharacterInterface {
  _id?: number;
  name: string;
  description: string;
  tier: number;
  characterType: CharacterType;
  user: User;
}
