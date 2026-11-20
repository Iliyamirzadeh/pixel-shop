import { Link } from 'react-router-dom'
import { Gamepad2 } from 'lucide-react'

function Footer() {
    return (
        <footer className="border-t border-line bg-surface">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-lg bg-pixel text-ink">
                            <Gamepad2 size={20} strokeWidth={2.5} />
                        </span>
                        <span className="text-lg font-black">پیکسل شاپ</span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted">
                        مرجع خرید کنسول، لوازم جانبی و تجهیزات گیمینگ اورجینال با ضمانت اصالت و ارسال سریع.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold">دسترسی سریع</h3>
                    <ul className="mt-4 space-y-3 text-sm text-muted">
                        <li>
                            <Link to="/products" className="transition-colors hover:text-pixel">
                                همه‌ی محصولات
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="transition-colors hover:text-pixel">
                                سبد خرید
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="transition-colors hover:text-pixel">
                                ورود به حساب
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold">پشتیبانی</h3>
                    <ul className="mt-4 space-y-3 text-sm text-muted">
                        <li>همه‌روزه ۹ تا ۲۱</li>
                        <li>support@pixelshop.ir</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-line py-5 text-center text-xs text-muted">
                تمامی حقوق برای پیکسل شاپ محفوظ است
            </div>
        </footer>
    )
}

export default Footer