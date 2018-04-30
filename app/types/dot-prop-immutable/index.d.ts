declare module 'dot-prop-immutable' {
    interface DotPropImmutable {
        get<T>(object: T, path: string): T;
        set<T>(object: T, path: string, value: any): T;
        delete<T>(object: T, path: string): T;
        merge<T>(object: T, path: string, value: any): T;
    }
    
    const DotProp: DotPropImmutable;
    
    export default DotProp;
}