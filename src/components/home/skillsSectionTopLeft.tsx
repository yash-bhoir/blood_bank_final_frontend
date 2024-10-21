
import { FlipWords } from "./flip-words";

export function FlipWordsDemo() {
    const words = ['precious', 'Irreplaceable ', 'Priceless ', 'Cherished ', 'Vital '];

    return (
        <div className="h-auto flex-col justify-center items-center px-10 mt-7">

            <div className="text-3xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                <div >
                    Fastest Blood Delivery
                </div>
                <div className="mt-6">
                    in Critical Conditions, 
                </div>
                <div className="mt-6">
                 saving precious 
                </div>
                <div className="mt-6">
                    <FlipWords words={words} /> <br />
                </div>
                <div className="mt-6">
                lives.
                </div>
            </div>
        </div>
    );
}

export default FlipWordsDemo;
