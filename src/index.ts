import express from 'express';
import bodyParser from 'body-parser';
import * as lark from '@larksuiteoapi/node-sdk';
import { cardDispatcher, challengeSolver, eventDispatcher } from './dispatcher';

const server = express();
server.use(bodyParser.json());

server.use(
  '/webhook/event',
  challengeSolver,
  lark.adaptExpress(eventDispatcher)
);
server.use(
  '/webhook/card',
  challengeSolver,
  lark.adaptExpress(cardDispatcher)
);

console.log('Server listening on http://0.0.0.0:3000');
server.listen(3000);