import { Injectable, Next } from '@nestjs/common';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '안알랴줌',
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
          content: `${keyword} 단어를 포함하는 소설을 작성해.`,
        },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    });
  }
}
