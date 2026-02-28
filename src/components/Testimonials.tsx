"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "ShopLoop AI 彻底改变了我们的内容工作流。以前做图写文案需要一周，现在只要半天。",
    name: "李薇",
    title: "独立品牌主理人",
    avatar: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  {
    quote: "文案生成的质量惊人，特别是针对小红书和短视频平台的语气把握，简直比我招的运营还专业。",
    name: "张浩",
    title: "资深运营总监",
    avatar: "bg-gradient-to-br from-blue-400 to-indigo-500",
  },
  {
    quote: "对于我们这种自媒体工作室来说，ShopLoop AI 是性价比最高的『员工』，极大提升了多平台的出稿效率。",
    name: "陈明",
    title: "自媒体工作室负责人",
    avatar: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="text-center mb-10 sm:mb-16">
           <h2 className="text-base font-semibold leading-7 text-primary">内测反馈</h2>
           <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
             来自早期用户的真实声音
           </p>
         </div>

          <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col justify-between rounded-2xl bg-gray-50 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div>
                   <svg className="h-8 w-8 text-purple-600/20 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>
                 <p className="text-base text-foreground/80 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-sm ${t.avatar}`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}