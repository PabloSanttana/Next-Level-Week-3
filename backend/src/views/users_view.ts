import Users from "../modules/Users";
import orphanages from "./orphanages_view";

export default {
  render(user: Users) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      orphanages: orphanages.renderMany(user.orphanages),
    };
  },
  renderMany(users: Users[]) {
    return users.map((user) => this.render(user));
  },
};
