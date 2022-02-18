import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './account.model'
import { Sequelize } from 'sequelize-typescript';
import { Person } from '../person/person.model';
import { Transaction } from '../transaction/transaction.model';
import { Company } from '../company/company.model';

describe('AccountController', () => {
  beforeEach(() => {

    const sequelize = new Sequelize( 'postgres', 'postgres', 'postgres' , {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    sequelize.addModels([Person,Transaction,Company,Account])
   
  });

  describe('import cnab file',  () => {

    let result = null

    it('should return object of account content', async () => {
      const accountService = new AccountService(Account);

      const file = '3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO       '
      const resultData = await accountService.registerCnab(null, file);
      result = resultData.$data[0];
      expect(resultData.$status).toEqual(200);
    });

    it('test company name', async () => {
      expect(result.company).toBe('BAR DO JOÃO       ');
    });

    it('test transaction list', async () => {
      expect(result.transaction.length).not.toBe(0);
      expect(Object.keys(result.transaction[0]).length).toEqual(5);
      expect(Object.keys(result.transaction[0])).toContain('ben_code');
      expect(result.transaction[0].type).toContain('Financiamento');
    });

    it('test company total', async () => {
      expect(result.total).not.toEqual(0)
    });
  });
});