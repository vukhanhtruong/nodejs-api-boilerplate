import constants from '@/config/constants';

const sendGridConfig = {
  auth: {
    api_key: constants.MAIL_API_KEY,
  },
};

export default sendGridConfig;
