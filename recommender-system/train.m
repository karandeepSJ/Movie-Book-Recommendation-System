load movie;
load book;
[M1, N1]=size(a)
[M2, N2]=size(b)
Size = [M1 N1; M2 N2]; 
Data = [[a zeros(M1,N2)]; [zeros(M2,N1) b]]; 
b=b*2;
[X, Core, BB, ItemMem, UserMem] = RMGM(Data,Size,30,30,50); 
save('trained_params.mat','ItemMem', 'UserMem', 'X', 'Core', 'BB');
