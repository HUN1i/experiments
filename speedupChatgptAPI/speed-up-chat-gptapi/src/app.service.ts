import { Injectable, Next } from '@nestjs/common';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
});

@Injectable()
export class AppService {
  async getHello() {
    return openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a novelist.' },
        {
          role: 'user',
          content: '소설 쳐 써봐라',
        },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    });
  }
}
