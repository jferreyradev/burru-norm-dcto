const InputBox = () => {

    const handleBtnClick = e => {
        e.preventDefault()
        console.log(e)

        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            if (form.type ==='date'){
                const date = new Date(form.value)
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                console.log(date.toLocaleDateString(undefined, options));
            }
            //console.log(form.value, form.type)
            form.classList.add('was-validated')
        }, false)
    }

    return (

        <div className="container-sm">
            <form class="row g-3 " novalidate>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tipo</label>
                    <select className="form-select needs-validation" id="inputGroupSelect01">
                        <option defaultValue>Elija...</option>
                        <option value="1">Decreto</option>
                        <option value="2">Norma</option>
                        <option value="3">Ley</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Lugar</label>
                    <select className="form-select needs-validation" id="inputGroupSelect02">
                        <option defaultValue>Elija...</option>
                        <option value="1">San Miguel de Tucumán</option>
                        <option value="2">Burruyacu</option>
                        <option value="3">Trancas</option>
                    </select>
                </div>

                <div className="form-floating mb-3">
                    <input type="date" className="form-control needs-validation" id="floatingInput" placeholder="dd/mm/aaaa" />
                    <label htmlFor="floatingInput">Fecha</label>
                </div>

                <div>
                    <div className="input-group mb-3" >
                        <input type="file" className="form-control needs-validation" id="inputGroupFile02" />
                        <label className="input-group-text" htmlFor="inputGroupFile02" >Upload</label>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={handleBtnClick} >Enviar</button>
                </div>
            </form>
        </div>

    )
}

export default InputBox