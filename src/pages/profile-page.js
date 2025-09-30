export class ProfilePage {
  constructor(page) {
    this.page = page;
    // Локаторы 
    this.usernameLink = page.getByText('Yana'); // позже заменить  , пока вроде работает так 
    this.profileLink = page.getByRole('link', { name: 'Profile' });
    this.editProfileLink = page.getByRole('link', { name: 'Edit Profile Settings' });
    this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    this.successMessage = page.getByText('Update successful');
  }

  async navigateToProfile(username) {
    // Кликаем на имя пользователя в header
    await this.page.getByText(username).click();
    await this.profileLink.click();
  }

  async navigateToEditProfile() {
    await this.editProfileLink.click();
  }
}
