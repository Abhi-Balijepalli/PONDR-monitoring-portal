import thanosApp, { groundHogApp } from '../AxiosSetup';

import firebase from 'firebase/app';
import 'firebase/auth';

export const uploadBlogpost = async (data) => {
  return thanosApp.post('/admin/post-blog',
    {
      data: {
        author: data.author,
        title: data.title,
        description: data.description,
        body: data.body,
        img_link: data.imgLink
      }
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken()
      }
    });
};

export const getAllCompanies = async () => {
  return thanosApp.get('/admin/enterprise/all',
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken()
      }
    });
};

export const getAllCompanyProducts = async (companyId) => {
  return thanosApp.get('/admin/products/enterprise=' + companyId,
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken()
      }
    });
};

export const getAdvanceAnalytics = async (productId) => {
  return thanosApp.get('/admin/product=' + productId, {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken()
    }
  });
};

export const getFilteredProducts = async (queryStr) => {
  console.log(queryStr);
  return thanosApp.post('/admin/filter', {
    data: {
      query_str: queryStr
    }
  },
  {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken()
    }
  });
};

export const askAiQuestion = async (productId, question) => {
  return thanosApp.post(
    '/admin/product=' + productId + '/question',
    {
      data: {
        question: question
      }
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken()
      }
    }
  );
};

export const getAiQuestions = async (productId) => {
  return thanosApp.get('/admin/product=' + productId + '/ai', {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken()
    }
  });
};

export const CompareAskAiQuestion = async (productIds, question) => {
  return thanosApp.post(
    '/admin/compare/question',
    {
      data: {
        question: question,
        product_ids: productIds
      }
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken()
      }
    }
  );
};

export const getMetrics = async () => {
  return thanosApp.get('/admin/get-metrics', {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken()
    }
  });
};

export const askDemoAiQuestions = (question) => {
  return thanosApp.post('/demo/question', {
    data: {
      question: question
    }
  });
};

export const GetProductsInQueue = async () => {
  return groundHogApp.get('/product/waitlist', {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken()
    }
  });
};
