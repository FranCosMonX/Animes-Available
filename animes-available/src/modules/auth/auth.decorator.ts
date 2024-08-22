import { SetMetadata } from '@nestjs/common';


//decorador informando que a rota é publica, ja que por padrão a maioria serão privadas
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);