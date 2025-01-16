const images = import.meta.glob('/src/images/*.jpg', { eager: true });
export const gasimages = {
    zero: images['/src/images/0.jpg'].default,
    ten: images['/src/images/10.jpg'].default,
    twenty: images['/src/images/20.jpg'].default,
    thirty: images['/src/images/30.jpg'].default,
    fourty: images['/src/images/40.jpg'].default,
    fifty: images['/src/images/50.jpg'].default,
    sixty: images['/src/images/60.jpg'].default,
    seventy: images['/src/images/70.jpg'].default,
    eighty: images['/src/images/80.jpg'].default,
    ninety: images['/src/images/90.jpg'].default,
    hundred: images['/src/images/100.jpg'].default,
};
