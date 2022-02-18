import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './account.model'

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService(Account);
    accountController = new AccountController(accountService);
  });

  describe('import cnab file', () => {
    it('should return an array of account content', async () => {
      

      expect(await accountService.registerCnab()).toBe(result);
    });
  });
});