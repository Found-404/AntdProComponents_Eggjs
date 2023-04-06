export default {
  'GET /task/search': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        current: '1',
        pageSize: '20',
        total: 1,
        list: [
          {
            id: 1,
            name: 'amazon-sc-confirm-shipment',
            platform: 'amazon',
            account: '135859219281736',
            password: '932470qtzy',
            get_method: 'GET',
            get_url: 'http://127.0.0.1:7101/task',
            update_method: 'PUT',
            update_url: 'http://127.0.0.1:7101/task',
            status: 0,
            updated_at: '2023-01-30 11:24:55',
            created_at: '2023-01-30 11:24:55',
          },
        ],
      },
    });
  },
  'GET /shops/search': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        current: '1',
        pageSize: '20',
        total: 1,
        list: [
          {
            id: 1,
            name: 'amazon-sc-confirm-shipment',
            shop_guid: 'amazon',
            platform_url: '135859219281736',
            shopAccount: '932470qtzy',
            site: 'PUT',
            kjvsAccount: 'http://127.0.0.1:7101/task',
          },
          {
            id: 2,
            name: 'amazon-',
            shop_guid: 'amazon',
            platform_url: '135859219281736',
            shopAccount: '932470qtzy',
            site: 'PUT',
            kjvsAccount: 'http://127.0.0.1:7101/task',
          },
        ],
      },
    });
  },
  'GET /account/search': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        current: '1',
        pageSize: '20',
        total: 1,
        list: [
          {
            id: 1,
            account: '无敌暴龙战士',
            password: 'amazon',
          },
          {
            id: 2,
            account: 'amazon-',
            password: 'amazon',
          },
        ],
      },
    });
  },
  'DELETE /shops': (req: any, res: any) => {
    setTimeout(() => {
      res.json({
        success: true,
        data: [],
      });
    }, 3000);
  },
};
