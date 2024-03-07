import { Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const a = await this.appService.getHello();

    for await (const chunk of a) {
      for (const char of chunk.choices[0].delta?.content || '') {
        console.log(char);
        res.write(`data: ${char}\n\n`); // 한 글자씩 EventSource로 전송
        await new Promise((resolve) => setTimeout(resolve, 25)); // 각 글자를 100ms 간격으로 전송
      }
    }
    res.end();
  }
}
