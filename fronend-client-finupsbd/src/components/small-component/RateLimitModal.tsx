import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface RateLimitModalProps {
    message: string;
    retryTime?: number;
    isOpen: boolean;
    onClose: () => void;
}

const RateLimitModal = ({ message, retryTime, isOpen, onClose }: RateLimitModalProps) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(retryTime || 60);

    // Start a countdown timer when the modal opens
    useEffect(() => {
        if (isOpen && remainingTime !== null && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => (prevTime ? prevTime - 1 : 0));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isOpen, remainingTime]);

    const handleReload = () => {
        window.location.reload(); // Reload the page when the user clicks reload
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate Limit Exceeded</DialogTitle>
                    <DialogDescription>
                        {message} Try again in {remainingTime} seconds.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button onClick={handleReload} disabled={remainingTime !== null && remainingTime > 0}>
                        Reload Page
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RateLimitModal;
