export class HelperUtils {
  static convertToBanglaDate(englishDate: Date): string {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const banglaMonths = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

    const date = new Date(englishDate);  // 'englishDate' is a Date object now

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const convertToBanglaDigits = (num: number): string =>
      num.toString().split('').map(digit => banglaDigits[parseInt(digit)]).join('');

    return `${convertToBanglaDigits(day)} ${banglaMonths[month]} ${convertToBanglaDigits(year)}`;
  }

}