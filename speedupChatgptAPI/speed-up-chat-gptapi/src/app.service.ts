import { Injectable, Next } from '@nestjs/common';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'z',
});

@Injectable()
export class AppService {
  async getHello(keyword) {
    console.log(keyword);
    return openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a novelist.' },
        {
          role: 'user',
          content: `write just a novel in Korean with this keywords: ${keyword}, Don't say anything except about novel, Don't write a title. `,
        },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    });
  }
}
